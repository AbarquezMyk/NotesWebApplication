package com.notes.app.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.notes.app.entity.Tip;

public interface TipRepository extends JpaRepository<Tip, Long> {

    List<Tip> findBySenderWallet(String senderWallet);

    List<Tip> findByReceiverWallet(String receiverWallet);

    List<Tip> findByNoteId(Long noteId);
}