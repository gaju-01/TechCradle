package RESTAPI.SPRINGBOOTCP.CustomException;

public class BasicUserDefinedException extends RuntimeException {
    public BasicUserDefinedException(String message) {
        super(message);
    }
}
