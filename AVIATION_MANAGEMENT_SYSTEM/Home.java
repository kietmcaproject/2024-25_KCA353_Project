package airlinemanagementsystem;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class Home extends JFrame implements ActionListener {

    JMenuItem customerDetails;

    public Home(String userType) {
        setLayout(null);

        // Add background image
        ImageIcon i1 = new ImageIcon(ClassLoader.getSystemResource("airlinemanagementsystem/icons/front.jpg"));
        JLabel image = new JLabel(i1);
        image.setBounds(0, 0, 1400, 800);
        add(image);

        // Heading text
        JLabel heading = new JLabel("Welcome to Aviation Airlines");
        heading.setBounds(300, 30, 820, 50);
        heading.setForeground(new Color(0, 102, 204));
        heading.setFont(new Font("Arial", Font.BOLD, 48));
        heading.setHorizontalAlignment(SwingConstants.CENTER);
        heading.setOpaque(true);
        heading.setBackground(new Color(255, 255, 255, 150));
        image.add(heading);

        // Menu bar
        JMenuBar menubar = new JMenuBar();
        setJMenuBar(menubar);

        // Details menu
        JMenu details = new JMenu("Details");
        menubar.add(details);

        // Menu items under "Details"
        JMenuItem flightDetails = new JMenuItem("Flight Details");
        flightDetails.addActionListener(this);
        details.add(flightDetails);

        customerDetails = new JMenuItem("Add Customer Details");
        customerDetails.addActionListener(this);
        details.add(customerDetails);

        JMenuItem bookFlight = new JMenuItem("Book Flight");
        bookFlight.addActionListener(this);
        details.add(bookFlight);

        JMenuItem journeyDetails = new JMenuItem("Journey Details");
        journeyDetails.addActionListener(this);
        details.add(journeyDetails);

        JMenuItem ticketCancellation = new JMenuItem("Cancel Ticket");
        ticketCancellation.addActionListener(this);
        details.add(ticketCancellation);

        // Ticket menu
        JMenu ticket = new JMenu("Ticket");
        menubar.add(ticket);

        JMenuItem boardingPass = new JMenuItem("Boarding Pass");
        boardingPass.addActionListener(this);
        ticket.add(boardingPass);

        // Disable "Add Customer Details" if userType is "user"
        if (userType.equals("user")) {
            customerDetails.setEnabled(false);
        }

        // Set window properties
        setExtendedState(JFrame.MAXIMIZED_BOTH);
        setVisible(true);
    }

    // ActionListener implementation for menu items
    public void actionPerformed(ActionEvent ae) {
        String text = ae.getActionCommand();

        if (text.equals("Add Customer Details")) {
            new AddCustomer(); // Opens AddCustomer window (only for admin)
        } else if (text.equals("Flight Details")) {
            new FlightInfo(); // Opens FlightInfo window
        } else if (text.equals("Book Flight")) {
            new BookFlight(); // Opens BookFlight window
        } else if (text.equals("Journey Details")) {
            new JourneyDetails(); // Opens JourneyDetails window
        } else if (text.equals("Cancel Ticket")) {
            new Cancel(); // Opens Cancel Ticket window
        } else if (text.equals("Boarding Pass")) {
            new BoardingPass(); // Opens Boarding Pass window
        }
    }

    public static void main(String[] args) {
        new Home("admin"); // Use "admin" or "user" based on the login credentials
    }
}
