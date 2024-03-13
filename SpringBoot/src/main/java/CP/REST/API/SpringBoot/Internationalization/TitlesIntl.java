package CP.REST.API.SpringBoot.Internationalization;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import CP.REST.API.SpringBoot.Security.AllowAccessForResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

/**
 * @RestController is used to indicate that the class contain the controller methods that interact handling
 * the HTTP requests.
 * @EnableWebSecurity is used to enable the authorization semantics annotations such as,
 * @Secured
 * @PreAuthorize
 * @PostAuthorize And,
 * @AllowAccessForResource is a custom annotation that is used for pre-authorization at method level.
 * These annotations helps users to access the resources based on their assigned roles and
 * maintain separation of  concerns.
 */
@RestController
@EnableMethodSecurity
public class TitlesIntl {

    private MessageSource messageSource;

    @Autowired
    public TitlesIntl(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    @AllowAccessForResource
    @GetMapping(path = "cprestapi/intl/title/{intlTitle}")
    public String welcomeIntl(@PathVariable String intlTitle) {
        Locale locale = LocaleContextHolder.getLocale();
        System.out.println(
                "...................................\nThe locale language is " +
                        locale +
                        "\n..................................."
        );
        return this.messageSource.getMessage(
                intlTitle,
                null,
                "Message Cannot Be Displayed At This Moment",
                locale
        );
    }

    @AllowAccessForResource
    @GetMapping(path = "/cprestapi/intl/navbar")
    public List<String> navBarInt() {
        List<String> rec = new ArrayList<>();
        Locale locale = LocaleContextHolder.getLocale();
        rec.add(
                this.messageSource.getMessage("title.navbar.select", null, null, locale)
        );
        rec.add(this.messageSource.getMessage("title.navbar.welcome", null, null, locale));
        rec.add(
                this.messageSource.getMessage("title.navbar.blog", null, null, locale)
        );
        rec.add(
                this.messageSource.getMessage(
                        "title.navbar.create.blog",
                        null,
                        null,
                        locale
                )
        );
        rec.add(
                this.messageSource.getMessage(
                        "title.navbar.modify.blog",
                        null,
                        null,
                        locale
                )
        );
        rec.add(
                this.messageSource.getMessage("title.navbar.compiler", null, null, locale)
        );
        rec.add(
                this.messageSource.getMessage(
                        "title.navbar.followers",
                        null,
                        null,
                        locale
                )
        );
        rec.add(
                this.messageSource.getMessage(
                        "title.navbar.following",
                        null,
                        null,
                        locale
                )
        );
        return rec;
    }
}
