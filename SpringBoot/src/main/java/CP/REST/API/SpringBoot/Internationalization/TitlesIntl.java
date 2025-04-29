package CP.REST.API.SpringBoot.Internationalization;

import java.util.ArrayList;
import java.util.List;
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

    @GetMapping(path = "cprestapi/intl/title/{intlTitle}")
    public String welcomeIntl(@PathVariable String intlTitle) {
        Locale locale = LocaleContextHolder.getLocale();
        return this.messageSource.getMessage(
                intlTitle,
                null,
                "Message Cannot Be Displayed At This Moment",
                locale
        );
    }

    @GetMapping(path = "/cprestapi/intl/navbar")
    public List<String> navBarInt() {
        List<String> rec = new ArrayList<>();
        Locale locale = LocaleContextHolder.getLocale();
        rec.add(this.messageSource.getMessage("title.navbar.select", null, null, locale));
        rec.add(this.messageSource.getMessage("title.navbar.welcome", null, null, locale));
        rec.add(this.messageSource.getMessage("title.navbar.blog", null, null, locale));
        rec.add(this.messageSource.getMessage("title.navbar.create.blog", null, null, locale));
        rec.add(this.messageSource.getMessage("title.navbar.modify.blog", null, null, locale));
        rec.add(this.messageSource.getMessage("title.navbar.followers", null, null, locale));
        rec.add(this.messageSource.getMessage("title.navbar.following", null, null,locale));
        rec.add(this.messageSource.getMessage("title.navbar.profile", null, null, locale));
        return rec;
    }
}
