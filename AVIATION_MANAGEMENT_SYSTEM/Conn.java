package airlinemanagementsystem;

import java.sql.*;

public class Conn {
    
    Connection c;
    Statement s;
    Object conn;
    
    public Conn() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            c = DriverManager.getConnection("jdbc:mysql:///AMS", "root", "123456789");
            s = c.createStatement();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}