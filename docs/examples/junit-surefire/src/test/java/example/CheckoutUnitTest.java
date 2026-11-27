package example;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class CheckoutUnitTest {
    @Test
    void calculatesTotal() {
        assertEquals(750, CheckoutController.total(250, 3));
    }
}
