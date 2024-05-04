package CP.REST.API.SpringBoot.AOP;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;

@Configuration
@Aspect
public class PerformanceAspect {
    private Logger logger  = LoggerFactory.getLogger(getClass());

    @Around("execution(* CP.REST.API.SpringBoot.Email.*.*( . . ))")
    public Object performanceLoggingForEmail(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        long startTime = System.currentTimeMillis();
       Object returnValue =  proceedingJoinPoint.proceed();
        long stopTime = System.currentTimeMillis();
        logger.info("Performance Aspect");
        logger.info("Package: {}","CP.REST.API.SpringBoot.Email");
        logger.info("Method Details: {}", proceedingJoinPoint);
        logger.info("Method Args: {}", proceedingJoinPoint.getArgs());
        logger.info("Execution Time: {} ms", stopTime - startTime);
        logger.info("------------------------------------------------------------------------------------------------------------------------------------");
        return returnValue;
    }

    @Around("execution(* CP.REST.API.SpringBoot.Security.*.*( . . ))")
    public Object performanceLoggingForSecurity(ProceedingJoinPoint  proceedingJoinPoint) throws Throwable {
        long startTime = System.currentTimeMillis();
        Object returnValue = proceedingJoinPoint.proceed();
        long stopTime = System.currentTimeMillis();
        logger.info("Performance Aspect");
        logger.info("Package: {}","CP.REST.API.SpringBoot.Security");
        logger.info("Method Details: {}", proceedingJoinPoint);
        logger.info("Method Args: {}", proceedingJoinPoint.getArgs());
        logger.info("Execution Time: {} ms", stopTime - startTime);
        logger.info("------------------------------------------------------------------------------------------------------------------------------------");
        return returnValue;
    }

    @Around("execution(* CP.REST.API.SpringBoot.ValidationToken.*.*( . . ))")
    public Object performanceLoggingForVToken(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        long startTime = System.currentTimeMillis();
        Object returnValue = proceedingJoinPoint.proceed();
        long stopTime = System.currentTimeMillis();
        logger.info("Performance Aspect");
        logger.info("Package: {}", "CP.REST.API.SpringBoot.ValidationToken");
        logger.info("Method Details: {}", proceedingJoinPoint);
        logger.info("Method Args: {}", proceedingJoinPoint.getArgs());
        logger.info("Execution Time: {} ms", stopTime - startTime);
        logger.info("------------------------------------------------------------------------------------------------------------------------------------");
        return returnValue;
    }
}
