package CP.REST.API.SpringBoot.Security;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
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
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import javax.sql.DataSource;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.interfaces.RSAPublicKey;
import java.util.UUID;

import static org.springframework.security.config.Customizer.withDefaults;
@Configuration
@EnableWebSecurity
public class JwtSecurityConfiguration {
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
        http.httpBasic(withDefaults()) ;
        http.headers((headers) -> headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin));
        http.csrf(AbstractHttpConfigurer::disable);
        http.oauth2ResourceServer(OAuth2ResourceServerConfigurer -> OAuth2ResourceServerConfigurer.jwt(withDefaults()));
        return http.build();
    }

    /**
     * The following bean creates the Embedded Database(DefaultResourceLoader) with database type as H2.
     * It further adds "org/springframework/security/core/userdetails/jdbc/users.ddl" schema to our database
     * using JDBC. It further helps in role based access and authorization of the backend application. Unlike the
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
        var dev = User.withUsername("dev").password("111").passwordEncoder(str -> bCryptPasswordEncoder().encode(str)).roles("DEV").build();
        var admin = User.withUsername("admin").password("111").passwordEncoder(str -> bCryptPasswordEncoder().encode(str)).roles("ADMIN").build();
        var test = User.withUsername("test").password("111").passwordEncoder(str -> bCryptPasswordEncoder().encode(str)).roles("TESTER").build();
        var dbManager = User.withUsername("dbm").password("111").passwordEncoder(str -> bCryptPasswordEncoder().encode(str)).roles("DBMANAGER").build();
        var backend = User.withUsername("bend").password("111").passwordEncoder(str -> bCryptPasswordEncoder().encode(str)).roles("BACKEND").build();
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

    @Bean
    public KeyPair  keyPair() {
        try {
            var keyPairGenerator = KeyPairGenerator.getInstance("RSA");
            keyPairGenerator.initialize(2048);
            return keyPairGenerator.generateKeyPair();
        } catch(NoSuchAlgorithmException e) {
            throw new RuntimeException();
        }
    }

    @Bean
    public RSAKey rsaKey(KeyPair keyPair) {
        return new RSAKey
                .Builder((RSAPublicKey) keyPair.getPublic())
                .privateKey(keyPair.getPrivate())
                .keyID(UUID.randomUUID().toString())
                .build();
    }

    @Bean
    public JWKSource<SecurityContext> jwkSource(RSAKey rsaKey) {
        var jwkSet = new JWKSet(rsaKey);
        return ((jwkSelector, securityContext) -> jwkSelector.select(jwkSet));
    }

    @Bean
    public JwtDecoder jwtDecoder(RSAKey rsaKey) throws JOSEException {
        return NimbusJwtDecoder
                .withPublicKey(rsaKey.toRSAPublicKey())
                .build();
    }

    @Bean
    public JwtEncoder jwtEncoder(JWKSource<SecurityContext> jwkSource) {
        return new NimbusJwtEncoder(jwkSource);
    }
}
