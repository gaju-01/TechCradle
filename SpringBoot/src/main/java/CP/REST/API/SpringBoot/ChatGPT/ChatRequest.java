package CP.REST.API.SpringBoot.ChatGPT;

import java.util.List;

import lombok.Data;

import java.util.ArrayList;

@Data
public class ChatRequest {
    private String model;
    private List<Message> messages;

    public ChatRequest(String model, String prompt) {
        this.model = model;
        this.messages = new ArrayList<>();
        this.messages.add(new Message("user", prompt));
    }
}
