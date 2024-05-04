package CP.REST.API.SpringBoot.AOP;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;

/**
 * Logging Aspect in AOP
 */
@Configuration
@Aspect
public class LoggingAspect {

    private Logger logger = LoggerFactory.getLogger(getClass());
    private final String[] arr = {"CP.REST.API.SpringBoot.ValidationToken", "CP.REST.API.SpringBoot.Security", "CP.REST.API.SpringBoot.Email"};
    private final String[] aspects = {"Before Aspects,", "After Returning Aspects,", "After Throwing Aspects,"};

    /**
     * Before Method Call Aspects
     * @param joinPoint
     */
    @Before("execution(* CP.REST.API.SpringBoot.ValidationToken.*.*( . . ))")
    public void loggingBeforeVTokenMethodCalls(JoinPoint joinPoint) {
        logger.info(aspects[0]);
        logger.info("Package: {}", arr[0]);
        logger.info("Method Call Details: {}", joinPoint);
        logger.info("Method Call Class: {}", joinPoint.getClass());
        logger.info("Method Call Args: {}", joinPoint.getArgs());
        logger.info("------------------------------------------------------------------------------------------------------------------------------------");
    }

    @Before("execution(* CP.REST.API.SpringBoot.Security.*.*( . . ))")
    public void loggingBeforeSecurityMethodCalls(JoinPoint joinPoint) {
        logger.info(aspects[0]);
        logger.info("Package: {}",arr[1]);
        logger.info("Method Call Details: {}", joinPoint);
        logger.info("Method Call Class: {}", joinPoint.getClass());
        logger.info("Method Call ArgsL {}", joinPoint.getArgs());
        logger.info("------------------------------------------------------------------------------------------------------------------------------------");
    }

    @Before("execution(* CP.REST.API.SpringBoot.Email.*.*( . . ))")
    public void loggingBeforeEmailService(JoinPoint joinPoint) {
        logger.info(aspects[0]);
        logger.info("Package: {}", arr[2]);
        logger.info("Method Call Details: {}", joinPoint);
        logger.info("Method Call Class: {}", joinPoint.getClass());
        logger.info("Method Call ArgsL {}", joinPoint.getArgs());
        logger.info("------------------------------------------------------------------------------------------------------------------------------------");
    }

    /**
     * After Returning Aspects
     * @param joinPoint
     * @param returns
     */
    @AfterReturning(pointcut = "execution(* CP.REST.API.SpringBoot.ValidationToken.*.*( . . ))", returning = "returns")
    public void loggingAfterReturningVTokenMethodCalls(JoinPoint joinPoint, Object returns) {
        logger.info(aspects[1]);
        logger.info("Package: {}", arr[0]);
        logger.info("After Return Details: {}", joinPoint);
        logger.info("Class: {}", joinPoint.getClass());
        logger.info("After Return Method Args {}", joinPoint.getArgs());
        logger.info("Returns {}", returns);
        logger.info("------------------------------------------------------------------------------------------------------------------------------------");
    }

    @AfterReturning(pointcut = "execution(* CP.REST.API.SpringBoot.Security.*.*( . . ))", returning = "returns")
    public void loggingAfterReturningSecurityMethodCalls(JoinPoint joinPoint, Object returns) {
        logger.info(aspects[1]);
        logger.info("Package: {}", arr[1]);
        logger.info("After Return Details: {}", joinPoint);
        logger.info("Class: {}", joinPoint.getClass());
        logger.info("After Return Method Args {}", joinPoint.getArgs());
        logger.info("Returns {}", returns);
        logger.info("------------------------------------------------------------------------------------------------------------------------------------");
    }

    @AfterReturning(pointcut = "execution(* CP.REST.API.SpringBoot.Email.*.*( . . ))", returning = "returns")
    public void loggingAfterReturningEmailService(JoinPoint joinPoint, Object returns) {
        logger.info(aspects[1]);
        logger.info("Package: {}", arr[2]);
        logger.info("After Return Details: {}", joinPoint);
        logger.info("Class: {}", joinPoint.getClass());
        logger.info("After Return Method Args {}", joinPoint.getArgs());
        logger.info("Returns {}", returns);
        logger.info("------------------------------------------------------------------------------------------------------------------------------------");
    }

    /**
     * After Throws Aspect
     * @param joinPoint
     * @param throwss
     */
    @AfterThrowing(pointcut = "execution(* CP.REST.API.SpringBoot.ValidationToken.*.*( . . ))", throwing = "throwss")
    public void loggingAfterThrowingVToken(JoinPoint joinPoint, Exception throwss) {
        logger.info(aspects[2]);
        logger.info("Package: {}", arr[0]);
        logger.info("Method Call Details: {}", joinPoint);
        logger.info("Method Class Details: {}", joinPoint.getClass());
        logger.info("Method Args Details: {}", joinPoint.getArgs());
        logger.info("{} is thrown", throwss);
    }

    @AfterThrowing(pointcut = "execution(* CP.REST.API.SpringBoot.Security.*.*( . . ))", throwing = "throwss")
    public void loggingAfterThrowingSecurity(JoinPoint joinPoint, Exception throwss) {
        logger.info(aspects[2]);
        logger.info("Package: {}", arr[1]);
        logger.info("Method Call Details: {}", joinPoint);
        logger.info("Method Class Details: {}", joinPoint.getClass());
        logger.info("Method Args Details: {}", joinPoint.getArgs());
        logger.info("{} is thrown", throwss);
    }
    @AfterThrowing(pointcut = "execution(* CP.REST.API.SpringBoot.Email.*.*( . . ))", throwing = "throwss")
    public void loggingAfterThrowingEmail(JoinPoint joinPoint, Exception throwss) {
        logger.info(aspects[2]);
        logger.info("Package: {}", arr[2]);
        logger.info("Method Call Details: {}", joinPoint);
        logger.info("Method Class Details: {}", joinPoint.getClass());
        logger.info("Method Args Details: {}", joinPoint.getArgs());
        logger.info("{} is thrown", throwss);
    }
}