import java.util.Arrays;
import java.util.List;

import org.json.simple.JSONObject;

public class Db {
    
    private Socket socket;
    private String username;
    private String password;
    private List VALID_COMMANDS = Arrays.asList("find", "find_one", "push", "getData", "delete", "use");

    //contructor connects to socket and sets private vars username and password
    public Db (String host, int port, String user, String pass){
        username = user;
        password = pass;
        socket = new Socket(host, port);
    }

    //generate json object with this
    private JSONObject get_obj(String command, String path, Any data, boolean override){
        JSONObject obj = new JSONObject();
        if(VALID_COMMANDS.contains(command)){
            obj.put("username", username);
            obj.put("password", password);
            obj.put("command", command);
            obj.put("path", path);
            obj.put("data", data);
            obj.put("override", override || false);
            return obj;
        }
    }

}