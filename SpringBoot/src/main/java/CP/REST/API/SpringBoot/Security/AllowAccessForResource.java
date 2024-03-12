package CP.REST.API.SpringBoot.Security;

import java.lang.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

/**
 * The below @interface is used for pre-authorization when accessing the resource.
 * @PreAuthorize annotation is used to  provide pre-authorization semantics at
 * method/request level. This annotation uses set of roles to grant access to the
 * method/resource. @PreAuthorize annotation is used along with
 * @EnableMethodSecurity(securedEnabled = true).
 * @EnableWebSecurity is used to enable @Secured annotation.
 * Some of the similar annotations,
 * @PostAuthorize
 * @Secured
 * @PreFilter
 * @PostFliter
 */
@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN') or hasRole('ROLE_BACKEND')")
@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
public @interface  AllowAccessForResource {

}
