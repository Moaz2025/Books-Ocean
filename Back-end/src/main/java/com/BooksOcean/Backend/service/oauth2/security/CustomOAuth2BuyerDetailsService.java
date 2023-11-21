package com.BooksOcean.Backend.service.oauth2.security;

import com.BooksOcean.Backend.entity.Buyer;
import com.BooksOcean.Backend.entity.Provider;
import com.BooksOcean.Backend.exception.BaseException;
import com.BooksOcean.Backend.repository.BuyerRepository;
import com.BooksOcean.Backend.repository.RoleRepository;
import com.BooksOcean.Backend.service.oauth2.OAuth2BuyerDetails;
import com.BooksOcean.Backend.service.oauth2.OAuth2BuyerDetailsFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.HashSet;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomOAuth2BuyerDetailsService extends DefaultOAuth2UserService {

    private final BuyerRepository buyerRepository;
    private final RoleRepository roleRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        try {
            return checkingOAuth2User(userRequest, oAuth2User);

        }catch (AuthenticationException e){
            throw e;

        }catch (Exception ex){
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User checkingOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User){
        OAuth2BuyerDetails oAuth2BuyerDetails =
                OAuth2BuyerDetailsFactory.getOAuth2BuyerDetails(
                        oAuth2UserRequest.getClientRegistration().getRegistrationId(),
                        oAuth2User.getAttributes());
        if(ObjectUtils.isEmpty(oAuth2BuyerDetails)){
            throw new BaseException("400", "not found");
        }

        Optional<Buyer> buyer = buyerRepository.findByUsernameAndProviderId(
                oAuth2BuyerDetails.getEmail(),
                oAuth2UserRequest.getClientRegistration().getRegistrationId());
        Buyer buyerDetails;
        if(buyer.isPresent()){
            buyerDetails = buyer.get();
            if(!buyerDetails.getProviderId()
                    .equals(oAuth2UserRequest.getClientRegistration().getRegistrationId())){
                throw new BaseException("400", "invalid site" + buyerDetails.getProviderId());
            }
            buyerDetails = updateOAuthBuyerDetails(buyerDetails, oAuth2BuyerDetails);

        }
        else {
            buyerDetails = registerNewOAuthBuyerDetails(oAuth2UserRequest, oAuth2BuyerDetails);
        }
        return new OAuth2BuyerDetailsCustom(
                buyerDetails.getId(),
                buyerDetails.getUsername(),
                buyerDetails.getPassword(),
                buyerDetails.getRoles().stream().map(r -> new SimpleGrantedAuthority(r.getName())).collect(Collectors.toList()));
    }

    public Buyer registerNewOAuthBuyerDetails(OAuth2UserRequest oAuth2UserRequest, OAuth2BuyerDetails oAuth2BuyerDetails){
        Buyer buyer = new Buyer();
        buyer.setUsername(oAuth2BuyerDetails.getEmail());
        buyer.setFirstName(oAuth2BuyerDetails.getFirstName());
        buyer.setLastName(oAuth2BuyerDetails.getLastName());
        buyer.setProviderId(oAuth2UserRequest.getClientRegistration().getRegistrationId());
        buyer.setEnabled(true);
        buyer.setCredentialsNonExpired(true);
        buyer.setAccountNonLocked(true);
        buyer.setAccountNonExpired(true);
        buyer.setRoles(new HashSet<>());
        buyer.getRoles().add(roleRepository.findByName("USER"));
        return buyerRepository.save(buyer);
    }

    public Buyer updateOAuthBuyerDetails(Buyer buyer, OAuth2BuyerDetails oAuth2BuyerDetails){
        buyer.setUsername(oAuth2BuyerDetails.getEmail());
        buyer.setFirstName(oAuth2BuyerDetails.getFirstName());
        buyer.setLastName(oAuth2BuyerDetails.getLastName());
        return buyerRepository.save(buyer);

    }

}
