package com.example.demo;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

public class SimpleCalcTest {

    @Test
    void testAdd(){
        SimpleCalc calc = new SimpleCalc();
        assertEquals(4,calc.add(2,2));
        assertEquals(-10,calc.add(-12,2));
        assertEquals(24,calc.add(12,12));
    }
}
