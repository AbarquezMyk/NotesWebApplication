package com.notes.app.service;

import com.notes.app.entity.Tip;
import com.notes.app.entity.Note;
import com.notes.app.repository.TipRepository;
import com.notes.app.repository.NoteRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TipService {

    private final TipRepository tipRepository;
    private final NoteRepository noteRepository;

    public TipService(TipRepository tipRepository, NoteRepository noteRepository) {
        this.tipRepository = tipRepository;
        this.noteRepository = noteRepository;
    }

    public Tip recordTip(Tip tip) {

        // Set timestamp
        tip.setTimestamp(LocalDateTime.now());

        // Save tip in DB
        Tip savedTip = tipRepository.save(tip);

        // Update note tip count ONLY AFTER txHash exists
        if (tip.getTxHash() != null) {
            Note note = noteRepository.findById(tip.getNoteId()).orElseThrow();
            note.setTipCount(note.getTipCount() + 1);
            noteRepository.save(note);
        }

        return savedTip;
    }

    public List<Tip> getTipsSent(String wallet) {
        return tipRepository.findBySenderWallet(wallet);
    }

    public List<Tip> getTipsReceived(String wallet) {
        return tipRepository.findByReceiverWallet(wallet);
    }

    public List<Tip> getTipsByNote(Long noteId) {
        return tipRepository.findByNoteId(noteId);
    }
}