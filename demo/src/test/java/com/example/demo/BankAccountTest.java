package com.example.demo;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class BankAccountTest {
    private BankAccount account1;
    private BankAccount account2;

    @BeforeEach
    void setUp() {
        account1 = new BankAccount("123456", 1000.0);
        account2 = new BankAccount("789012", 500.0);
    }

    @Test
    void testDeposit() {
        account1.deposit(500.0);
        assertEquals(1500.0, account1.getBalance(), "Deposit failed");
    }

    @Test
    void testWithdraw() {
        account1.withdraw(200.0);
        assertEquals(800.0, account1.getBalance(), "Withdrawal failed");
    }

    @Test
    void testWithdrawInsufficientFunds() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            account1.withdraw(2000.0);
        });
        assertEquals("Insufficient funds", exception.getMessage());
    }

    @Test
    void testTransfer() {
        account1.transfer(account2, 300.0);
        assertEquals(700.0, account1.getBalance(), "Sender balance incorrect");
        assertEquals(800.0, account2.getBalance(), "Receiver balance incorrect");
    }

    @Test
    void testTransferToNullAccount() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            account1.transfer(null, 100.0);
        });
        assertEquals("Target account cannot be null", exception.getMessage());
    }
}
