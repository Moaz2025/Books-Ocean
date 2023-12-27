package com.BooksOcean.Backend.service;

import com.BooksOcean.Backend.entity.Buyer;
import com.BooksOcean.Backend.entity.Order;
import com.BooksOcean.Backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    public List<Order> getOrderByBuyer(Buyer buyer){
        return orderRepository.findByBuyer(buyer);
    }

    public Order updateOrder(Order order) {
        return orderRepository.save(order);
    }

    public void deleteOrder(Order order) {
        orderRepository.delete(order);
    }
}
