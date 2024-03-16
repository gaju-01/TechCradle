package CP.REST.API.SpringBoot.Security;

import static org.springframework.security.config.Customizer.withDefaults;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.jdbc.JdbcDaoImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import javax.sql.DataSource;
import javax.xml.crypto.Data;

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
     * Any request that is made by the client has to pass through the security chains,
     * 1. Authorize all kind of HTTP requests.
     * 2. Implement a stateless session management policy.
     * 3. Allow the basic default authentication.
     * 4. Disable the frame options which hinders the visibility of h2-console.
     * 5. Disable the CSRF temporarily.
     *
     * @param HttpSecurity - It is used to apply security filter chain measures
     * @return SecurityFilterChain - after measures are taken Security filter chain is returned
     * @throws Exception - throws Exception
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(auth -> auth.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll().anyRequest().authenticated());
        http.sessionManagement(httpSecuritySessionManagementConfigurer -> httpSecuritySessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        http.httpBasic(withDefaults());
        http.headers((headers) -> headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin));
        http.csrf(AbstractHttpConfigurer::disable);
        return http.build();
    }

//    /** The following code is only used for test
//     * The following bean is responsible for role based authorization for the Spring Boot Application.
//     * The privileges and access are different based on roles.
//     *
//     * @return UserDetailsService - contains the different roles
//     */
//    @Bean
//    public UserDetailsService userDetailsService() {
//        var user = User.withUsername("user").password("{noop}pass").roles("USER").build();
//        var dev = User.withUsername("dev").password("{noop}111").roles("DEV").build();
//        var admin = User.withUsername("admin").password("{noop}111").roles("ADMIN").build();
//        var test = User.withUsername("test").password("{noop}111").roles("TEST").build();
//        var dbManager = User.withUsername("dbm").password("{noop}111").roles("DBMANAGER").build();
//        var backend = User.withUsername("bend").password("{noop}111").roles("BACKEND").build();
//        return new InMemoryUserDetailsManager(user, dev, admin, test, dbManager, backend);
//    }

    /**
     * The following bean creates the Embedded Database with database type as H2. It further adds
     * "org/springframework/security/core/userdetails/jdbc/users.ddl" schema to our data base using
     * JDBC. It further helps in role based access and authorization of the backend application. Unlike the
     * above-mentioned bean, the following code  can be used in development and production as well.
     *
     * @return DataSource
     */
    @Bean
    public DataSource dataSource() {
        return new EmbeddedDatabaseBuilder()
                .setType(EmbeddedDatabaseType.H2)
                .addScript(JdbcDaoImpl.DEFAULT_USER_SCHEMA_DDL_LOCATION)
                .build();
    }

    /**
     * The following code snippet can be used to create the roles and insert it in embedded
     * H2 database using JDBCUserDetailsManager. It uses BCryptPassWordEncoder Hashing
     * function to encode the password and store it in Embedded database.
     *
     * @return UserDetailsService
     */
    @Bean
    public UserDetailsService userDetailsService(DataSource dataSource) {
        var user = User.withUsername("user").password("pass").passwordEncoder(str -> bCryptPasswordEncoder().encode(str)).roles("USER").build();
        var dev = User.withUsername("dev").password("{noop}111").passwordEncoder(str -> bCryptPasswordEncoder().encode(str)).roles("DEV").build();
        var admin = User.withUsername("admin").password("{noop}111").passwordEncoder(str -> bCryptPasswordEncoder().encode(str)).roles("ADMIN").build();
        var test = User.withUsername("test").password("{noop}111").roles("TEST").passwordEncoder(str -> bCryptPasswordEncoder().encode(str)).build();
        var dbManager = User.withUsername("dbm").password("{noop}111").passwordEncoder(str -> bCryptPasswordEncoder().encode(str)).roles("DBMANAGER").build();
        var backend = User.withUsername("bend").password("{noop}111").passwordEncoder(str -> bCryptPasswordEncoder().encode(str)).roles("BACKEND").build();
        var detailersManager = new JdbcUserDetailsManager(dataSource);
        detailersManager.createUser(user);
        detailersManager.createUser(dev);
        detailersManager.createUser(admin);
        detailersManager.createUser(test);
        detailersManager.createUser(dbManager);
        detailersManager.createUser(backend);
        return detailersManager;
    }

    /**
     *  Creates and returns an instance of BCryptPasswordEncoder which is used to
     *  hash the password and store it in embedded H2 database.
     * @return BCryptPasswordEncoder
     */
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
