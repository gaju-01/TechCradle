package CP.REST.API.SpringBoot.Exceptions;

public class BasicUserDefinedException extends RuntimeException {
    String message;

    public BasicUserDefinedException(String message) {
        super(message);
        this.message = message;
    }

    @Override
    public String toString() {
        return "Basic User Defined Exception: [message: " + this.message + "]";
    }
}
