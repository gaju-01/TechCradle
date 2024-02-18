package CP.REST.API.SpringBoot.Blogs;

import CP.REST.API.SpringBoot.Exceptions.BasicUserDefinedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.Optional;

@RestController
public class ProfileRESTController {
    private final String FOLDER_PATH = "G:\\CPRESTAPIData\\Profile";
    private final String ACT_FOLDER_PATH = "G:/CPRESTAPIData/Profile";
    private final String MESSAGE = "Error uploading the image";
    private final String DEL_MESS = "Error deleting the image";
    private ProfileRepo profileRepo;
    private UserRepo userRepo;

    @Autowired
    public ProfileRESTController(ProfileRepo profileRepo, UserRepo userRepo) {
        this.profileRepo = profileRepo;
        this.userRepo = userRepo;
    }

    @PostMapping(path = "/cprestapi/uploadPic", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Profile> uploadProfilePic(@RequestPart MultipartFile profilePic, @RequestParam(name = "userName") String userName) throws IllegalStateException, IOException {
        if (profilePic.getContentType() == null || profilePic.getOriginalFilename() == null) {
            throw new BasicUserDefinedException(MESSAGE);
        }
        if (!Files.exists(Path.of(FOLDER_PATH))) {
            try {
                Files.createDirectories(Path.of(FOLDER_PATH));
            } catch (IOException e) {
                throw new BasicUserDefinedException(MESSAGE);
            }
        }
        String FILE_PATH = FOLDER_PATH + "\\" + profilePic.getOriginalFilename();
        Optional<User> opUser = this.userRepo.findByUserName(userName);
        User user = opUser.get();
        Optional<Profile> opProfile = this.profileRepo.findByUser(user);
        Profile profile;
        if (opProfile.isPresent()) {
            profile = opProfile.get();
            Files.deleteIfExists(Path.of(FOLDER_PATH + "\\" + profilePic.getOriginalFilename()));
        } else {
            profile = new Profile(user);
        }
        profile.setFileName(profilePic.getOriginalFilename());
        profile.setType(profilePic.getContentType());
        profile.setFilePath(FILE_PATH);
        this.profileRepo.save(profile);
        profilePic.transferTo(new File(FILE_PATH));
        return new ResponseEntity<>(HttpStatusCode.valueOf(200));
    }

    @DeleteMapping(path = "/cprestapi/deletePic")
    public ResponseEntity<String> deleteProfilePic(@RequestParam(name = "userName") String userName) {
        Optional<User> opUser = this.userRepo.findByUserName(userName);
        User user = opUser.get();
        Optional<Profile> opProfile = this.profileRepo.findByUser(user);
        if (opProfile.isPresent()) {
            Profile profile = opProfile.get();
            this.profileRepo.delete(profile);
        }
        return ResponseEntity.ok("Profile picture deleted successfully");
    }

    @GetMapping(path = "/cprestapi/getPic", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    @ResponseBody
    public byte[] getProflePic(@RequestParam(name = "userName") String userName) {
        Optional<User> opUser = this.userRepo.findByUserName(userName);
        User user = opUser.get();
        Optional<Profile> opProfile = this.profileRepo.findByUser(user);
        if(opProfile.isPresent()) {
            String filePath = FOLDER_PATH + "\\" + opProfile.get().getFileName();
            Path path = Path.of(filePath);
            File file = path.toFile();
            try {
                FileInputStream fileInputStream = new FileInputStream(file);
                byte[] arr = new byte[(int)file.length()];
                fileInputStream.read(arr);
                fileInputStream.close();
                return arr;
            } catch (IOException ioException) {
                throw new BasicUserDefinedException("Error retrieving the image");
            }
        }
        return null;
    }
}
