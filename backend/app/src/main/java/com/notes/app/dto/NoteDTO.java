package com.notes.app.dto;

public class NoteDTO {
    private String title;
    private String text;
    private Long categoryId;

    // NEW FIELDS
    private String walletAddress;
    private String walletPrivateKey;

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public Long getCategoryId() { return categoryId; }
    public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }

    public String getWalletAddress() { return walletAddress; }
    public void setWalletAddress(String walletAddress) { this.walletAddress = walletAddress; }

    public String getWalletPrivateKey() { return walletPrivateKey; }
    public void setWalletPrivateKey(String walletPrivateKey) { this.walletPrivateKey = walletPrivateKey; }
}