package CP.REST.API.SpringBoot.Security;

import static org.springframework.security.config.Customizer.withDefaults;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

/**
 * @EnableWebSecurity allows Spring to find (it's a @Configuration and, therefore, @Component ) and
 * automatically apply the class to the global WebSecurity.
 * @Configuration helps Spring to identify a class as Configuration class and applies the configuration
 * provided in the following class.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

  /**
   *  Any request that is made by the client has to pass through the security chains,
   * 1. Authorize all kind of HTTP requests.
   * 2. Implement a stateless session management policy.
   * 3. Allow the basic default authentication.
   * 4. Disable the frame options which hinders the visibility of h2-console.
   * 5. Disable the CSRF temporarily.
   * @param HttpSecurity - It is used to apply security filter chain measures
   * @return SecurityFilterChain - after measures are taken Security filter chain is returned
   * @throws Exception - throws Exception
   */
  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws  Exception{
    http.authorizeHttpRequests(auth -> auth.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll().anyRequest().authenticated());
    http.sessionManagement(httpSecuritySessionManagementConfigurer -> httpSecuritySessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
    http.httpBasic(withDefaults());
    http.headers((headers) -> headers.frameOptions((HeadersConfigurer.FrameOptionsConfig::disable)));
    http.csrf(AbstractHttpConfigurer::disable);
    return http.build();
  }

  /**
   *  The following bean is responsible for role based authorization for the Spring Boot Application.
   *  The privileges and access are different based on roles.
   * @return UserDetailsService - contains the different roles
   */
  @Bean
  public UserDetailsService userDetailsService() {
    var user = User.withUsername("user").password("{noop}pass").roles("USER").build();
    var dev = User.withUsername("dev").password("{noop}111").roles("DEV").build();
    var admin = User.withUsername("admin").password("{noop}111").roles("ADMIN").build();
    var test = User.withUsername("test").password("{noop}111").roles("TEST").build();
    var dbManager = User.withUsername("dbm").password("{noop}111").roles("DBMANAGER").build();
    var backend = User.withUsername("bend").password("{noop}111").roles("BACKEND").build();
    return new InMemoryUserDetailsManager(user, dev, admin, test, dbManager, backend);
  }
}
