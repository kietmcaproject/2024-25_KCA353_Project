package food;
import java.io.*;
import java.sql.*;
public class DataUtility {
    public static int executeDML(String sql) throws SQLException {
        int r = 0;
        Connection con = null;
        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/food_point", "root", "root");
            Statement st = con.createStatement();
            r = st.executeUpdate(sql);
        } catch (Exception ex) {
        } finally {
            con.close();
        }
        return r;
    }

    public static ResultSet executeDQL(String sql) throws SQLException {
        ResultSet r = null;
        Connection con = null;
        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/food_point", "root", "root");
            Statement st = con.createStatement();
            r = st.executeQuery(sql);
        } catch (Exception ex) {
        }
        return r;
    }
}
