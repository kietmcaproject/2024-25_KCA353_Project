package airlinemanagementsystem;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.sql.*;
import com.toedter.calendar.JDateChooser;
import java.util.*;

public class BookFlight extends JFrame implements ActionListener {

    JTextField tfaadhar;
    JLabel tfname, tfnationality, tfaddress, labelgender, labelfname, labelfcode;
    JButton bookflight, fetchButton, flight;
    Choice departure_city, arrival_city;
    JDateChooser dcdate;
    boolean userFetched = false;
    boolean flightFetched = false;

    public BookFlight() {
        getContentPane().setBackground(Color.WHITE);
        setLayout(null);

        JLabel heading = new JLabel("Book Flight");
        heading.setBounds(420, 20, 500, 35);
        heading.setFont(new Font("Tahoma", Font.PLAIN, 32));
        heading.setForeground(Color.BLUE);
        add(heading);

        JLabel lblaadhar = new JLabel("Passport No");
        lblaadhar.setBounds(60, 80, 150, 25);
        lblaadhar.setFont(new Font("Tahoma", Font.PLAIN, 16));
        add(lblaadhar);

        tfaadhar = new JTextField();
        tfaadhar.setBounds(220, 80, 150, 25);
        add(tfaadhar);

        fetchButton = new JButton("Fetch User");
        fetchButton.setBackground(Color.BLACK);
        fetchButton.setForeground(Color.WHITE);
        fetchButton.setBounds(380, 80, 120, 25);
        fetchButton.addActionListener(this);
        add(fetchButton);

        JLabel lblname = new JLabel("Name");
        lblname.setBounds(60, 130, 150, 25);
        lblname.setFont(new Font("Tahoma", Font.PLAIN, 16));
        add(lblname);

        tfname = new JLabel();
        tfname.setBounds(220, 130, 150, 25);
        add(tfname);

        JLabel lblnationality = new JLabel("Nationality");
        lblnationality.setBounds(60, 180, 150, 25);
        lblnationality.setFont(new Font("Tahoma", Font.PLAIN, 16));
        add(lblnationality);

        tfnationality = new JLabel();
        tfnationality.setBounds(220, 180, 150, 25);
        add(tfnationality);

        JLabel lbladdress = new JLabel("Address");
        lbladdress.setBounds(60, 230, 150, 25);
        lbladdress.setFont(new Font("Tahoma", Font.PLAIN, 16));
        add(lbladdress);

        tfaddress = new JLabel();
        tfaddress.setBounds(220, 230, 150, 25);
        add(tfaddress);

        JLabel lblgender = new JLabel("Gender");
        lblgender.setBounds(60, 280, 150, 25);
        lblgender.setFont(new Font("Tahoma", Font.PLAIN, 16));
        add(lblgender);

        labelgender = new JLabel("Gender");
        labelgender.setBounds(220, 280, 150, 25);
        add(labelgender);

        JLabel lblsource = new JLabel("departure_city");
        lblsource.setBounds(60, 330, 150, 25);
        lblsource.setFont(new Font("Tahoma", Font.PLAIN, 16));
        add(lblsource);

        departure_city = new Choice();
        departure_city.setBounds(220, 330, 150, 25);
        add(departure_city);

        JLabel lbldest = new JLabel("arrival_city");
        lbldest.setBounds(60, 380, 150, 25);
        lbldest.setFont(new Font("Tahoma", Font.PLAIN, 16));
        add(lbldest);

        arrival_city = new Choice();
        arrival_city.setBounds(220, 380, 150, 25);
        add(arrival_city);

        try {
            Conn c = new Conn();
            String query = "select * from flight";
            ResultSet rs = c.s.executeQuery(query);

            while (rs.next()) {
                departure_city.add(rs.getString("departure_city"));
                arrival_city.add(rs.getString("arrival_city"));
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        flight = new JButton("Fetch Flights");
        flight.setBackground(Color.BLACK);
        flight.setForeground(Color.WHITE);
        flight.setBounds(380, 380, 120, 25);
        flight.addActionListener(this);
        add(flight);

        JLabel lblfname = new JLabel("Flight Name");
        lblfname.setBounds(60, 430, 150, 25);
        lblfname.setFont(new Font("Tahoma", Font.PLAIN, 16));
        add(lblfname);

        labelfname = new JLabel();
        labelfname.setBounds(220, 430, 150, 25);
        add(labelfname);

        JLabel lblfcode = new JLabel("Flight Code");
        lblfcode.setBounds(60, 480, 150, 25);
        lblfcode.setFont(new Font("Tahoma", Font.PLAIN, 16));
        add(lblfcode);

        labelfcode = new JLabel();
        labelfcode.setBounds(220, 480, 150, 25);
        add(labelfcode);

        JLabel lbldate = new JLabel("Date of Travel");
        lbldate.setBounds(60, 530, 150, 25);
        lbldate.setFont(new Font("Tahoma", Font.PLAIN, 16));
        add(lbldate);

        dcdate = new JDateChooser();
        dcdate.setBounds(220, 530, 150, 25);
        add(dcdate);

        ImageIcon i1 = new ImageIcon(ClassLoader.getSystemResource("airlinemanagementsystem/icons/details.jpg"));
        Image i2 = i1.getImage().getScaledInstance(450, 320, Image.SCALE_DEFAULT);
        ImageIcon image = new ImageIcon(i2);
        JLabel lblimage = new JLabel(image);
        lblimage.setBounds(550, 80, 500, 410);
        add(lblimage);

        bookflight = new JButton("Book Flight");
        bookflight.setBackground(Color.BLACK);
        bookflight.setForeground(Color.WHITE);
        bookflight.setBounds(220, 580, 150, 25);
        bookflight.addActionListener(this);
        bookflight.setEnabled(false); // Initially disabled
        add(bookflight);

        setSize(1100, 700);
        setLocation(200, 50);
        setVisible(true);
    }

    public void actionPerformed(ActionEvent ae) {
        if (ae.getSource() == fetchButton) {
            String aadhar = tfaadhar.getText();

            try {
                Conn conn = new Conn();

                String query = "select * from passenger where aadhar = '" + aadhar + "'";

                ResultSet rs = conn.s.executeQuery(query);

                if (rs.next()) {
                    tfname.setText(rs.getString("name"));
                    tfnationality.setText(rs.getString("nationality"));
                    tfaddress.setText(rs.getString("address"));
                    labelgender.setText(rs.getString("gender"));
                    userFetched = true; // Set userFetched flag to true
                } else {
                    JOptionPane.showMessageDialog(null, "Please enter correct passport");
                    userFetched = false; // Set userFetched flag to false
                }
                // Enable or disable the bookflight button based on fetch success
                bookflight.setEnabled(userFetched && flightFetched);
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else if (ae.getSource() == flight) {
            String src = departure_city.getSelectedItem();
            String dest = arrival_city.getSelectedItem();
            try {
                Conn conn = new Conn();

                String query = "select * from flight where departure_city = '" + src + "' and arrival_city = '" + dest + "'";

                ResultSet rs = conn.s.executeQuery(query);

                if (rs.next()) {
                    labelfname.setText(rs.getString("flight_name"));
                    labelfcode.setText(rs.getString("flight_code"));
                    flightFetched = true; // Set flightFetched flag to true
                } else {
                    JOptionPane.showMessageDialog(null, "No Flights Found");
                    flightFetched = false; // Set flightFetched flag to false
                }
                // Enable or disable the bookflight button based on fetch success
                bookflight.setEnabled(userFetched && flightFetched);
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else if (ae.getSource() == bookflight) {
            if (!userFetched || !flightFetched) {
                JOptionPane.showMessageDialog(null, "Please fetch user and flight details before booking.");
                return;
            }

            Random random = new Random();

            String aadhar = tfaadhar.getText();
            String name = tfname.getText();
            String nationality = tfnationality.getText();
            String flightname = labelfname.getText();
            String flightcode = labelfcode.getText();
            String src = departure_city.getSelectedItem();
            String des = arrival_city.getSelectedItem();
            String ddate = ((JTextField) dcdate.getDateEditor().getUiComponent()).getText();
            String pnr = "PNR" + random.nextInt(10000000);
            String bookingId = "IND" + random.nextInt(100000);

            try {
                Conn conn = new Conn();

                String query = "insert into reservation values('" + pnr + "', '" + bookingId + "', '" + aadhar + "', '" + name + "', '" + nationality + "', '" + flightname + "', '" + flightcode + "', '" + src + "', '" + des + "', '" + ddate + "')";

                conn.s.executeUpdate(query);

// Show dialog with PNR number and cancel button
JDialog bookingDialog = new JDialog(this, "Booking Confirmation", true);
bookingDialog.setLayout(new BorderLayout());
bookingDialog.setSize(300, 150);
bookingDialog.setLocationRelativeTo(this);

// Create a panel for PNR label and use BoxLayout to center it
JPanel centerPanel = new JPanel();
centerPanel.setLayout(new BoxLayout(centerPanel, BoxLayout.Y_AXIS));
centerPanel.add(Box.createVerticalGlue()); // Pushes content to the center
JLabel pnrLabel = new JLabel("Your PNR Number: " + pnr);
pnrLabel.setAlignmentX(Component.CENTER_ALIGNMENT);
centerPanel.add(pnrLabel);
centerPanel.add(Box.createVerticalGlue()); // Pushes content to the center

JButton cancelButton = new JButton("Cancel");
cancelButton.addActionListener(new ActionListener() {
    public void actionPerformed(ActionEvent e) {
        bookingDialog.dispose();
    }
});

// Add components to the dialog
bookingDialog.add(centerPanel, BorderLayout.CENTER);
bookingDialog.add(cancelButton, BorderLayout.SOUTH);

bookingDialog.setVisible(true);


                setVisible(false);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    public static void main(String[] args) {
        new BookFlight();
    }
}
