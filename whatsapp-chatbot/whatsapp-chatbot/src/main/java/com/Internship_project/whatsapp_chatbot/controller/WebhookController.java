package com.Internship_project.whatsapp_chatbot.controller;


import com.Internship_project.whatsapp_chatbot.models.MessageRequest;
import com.Internship_project.whatsapp_chatbot.models.MessageResponse;
import com.Internship_project.whatsapp_chatbot.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/webhook")
public class WebhookController {

    @Autowired
    private ChatService chatService;

    @PostMapping
    public MessageResponse handleMessage(@RequestBody MessageRequest request) {

        // Log incoming message
        System.out.println("Received message: " + request.getMessage());

        // Get reply
        String reply = chatService.getReply(request.getMessage());

        // Return response
        return new MessageResponse(reply);
    }
}