package example;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(CheckoutController.class)
class CheckoutSliceTest {
    @Autowired
    MockMvc mvc;

    @Test
    void returnsTotal() throws Exception {
        mvc.perform(get("/checkout/total"))
                .andExpect(status().isOk())
                .andExpect(content().string("750"));
    }
}
