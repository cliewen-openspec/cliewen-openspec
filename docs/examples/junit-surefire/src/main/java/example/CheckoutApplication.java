package example;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class CheckoutApplication {}

@RestController
class CheckoutController {
    static int total(int price, int quantity) {
        return price * quantity;
    }

    @GetMapping("/checkout/total")
    int checkout() {
        return total(250, 3);
    }
}
