package CP.REST.API.SpringBoot.Internationalization;

import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TitlesIntl {
    private MessageSource messageSource;

    @Autowired
    public TitlesIntl(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    @GetMapping(path = "/cprestapi/intl/{intlTitle}")
    public String welcomeIntl(@PathVariable String intlTitle) {
        Locale locale = LocaleContextHolder.getLocale();
        System.out.println("...................................\nThe locale language is " + locale
                + "\n...................................");
        return this.messageSource.getMessage(intlTitle, null,
                "Message Cannot Be Displayed At This Moment", locale);
    }
}
