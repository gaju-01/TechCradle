// package CP.REST.API.SpringBoot.Security;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.web.SecurityFilterChain;
// import static org.springframework.security.config.Customizer.withDefaults;
// import
// org.springframework.security.config.annotation.web.builders.HttpSecurity;

// @Configuration
// public class SecurityConfiguration {
// @Bean
// public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
// http.authorizeHttpRequests(
// auth -> auth.anyRequest().authenticated());
// http.httpBasic(withDefaults());
// http.csrf().disable();
// return http.build();
// }
// }
