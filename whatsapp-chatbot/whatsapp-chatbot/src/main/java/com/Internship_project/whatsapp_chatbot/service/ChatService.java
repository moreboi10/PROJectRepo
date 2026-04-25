package com.Internship_project.whatsapp_chatbot.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ChatService {

    private final Map<String, String> responseMap = new HashMap<>();

    public ChatService() {
        responseMap.put("hi", "Hello");
        responseMap.put("bye", "Goodbye");
    }

    public String getReply(String message) {

        if (message == null || message.trim().isEmpty()) {
            return "I didn't understand that.";
        }

        String normalized = message.toLowerCase().trim();

        return responseMap.getOrDefault(normalized, "Sorry, I don't understand.");
    }
}