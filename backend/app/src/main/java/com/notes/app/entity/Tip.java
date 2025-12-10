package com.notes.app.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tips")
public class Tip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long noteId;

    private String senderWallet;
    private String receiverWallet;

    private double amount;

    private String txHash;

    private LocalDateTime timestamp;

    // GETTERS / SETTERS
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getNoteId() { return noteId; }
    public void setNoteId(Long noteId) { this.noteId = noteId; }

    public String getSenderWallet() { return senderWallet; }
    public void setSenderWallet(String senderWallet) { this.senderWallet = senderWallet; }

    public String getReceiverWallet() { return receiverWallet; }
    public void setReceiverWallet(String receiverWallet) { this.receiverWallet = receiverWallet; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public String getTxHash() { return txHash; }
    public void setTxHash(String txHash) { this.txHash = txHash; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}