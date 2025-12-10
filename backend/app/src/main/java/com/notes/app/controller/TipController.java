package com.notes.app.controller;

import com.notes.app.entity.Tip;
import com.notes.app.service.TipService;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tips")
@CrossOrigin(origins = "http://localhost:5173")
public class TipController {

    private final TipService tipService;

    public TipController(TipService tipService) {
        this.tipService = tipService;
    }

    // Record tip AFTER Lace Wallet confirms tx
    @PostMapping("/send")
    public ResponseEntity<Tip> sendTip(@RequestBody Tip tip) {
        Tip saved = tipService.recordTip(tip);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    // Get tips sent by a wallet
    @GetMapping("/sent/{wallet}")
    public List<Tip> getSentTips(@PathVariable String wallet) {
        return tipService.getTipsSent(wallet);
    }

    // Get tips received
    @GetMapping("/received/{wallet}")
    public List<Tip> getReceivedTips(@PathVariable String wallet) {
        return tipService.getTipsReceived(wallet);
    }

    // Get all tips for a note
    @GetMapping("/note/{noteId}")
    public List<Tip> getTipsByNote(@PathVariable Long noteId) {
        return tipService.getTipsByNote(noteId);
    }
}