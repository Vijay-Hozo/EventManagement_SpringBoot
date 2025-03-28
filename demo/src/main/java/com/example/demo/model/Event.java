package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String adminid;

    @Column(nullable = false)
    private String eventName;

    @Column(nullable = false)
    private String eventDescription;

    @Column(nullable = false)
    private String eventDate;

    @Column(nullable = false)
    private String eventTime;

    @Column(nullable = false)
    private String eventLocation;

    @Column(nullable = false)
    private Double eventFee;

    @Column(nullable = false)
    private Integer tickets;

    // Default constructor
    public Event() {}

    // Parameterized constructor
    public Event(String adminid, String eventName, String eventDescription, String eventDate, 
                 String eventTime, String eventLocation, Double eventFee, Integer tickets) {
        this.adminid = adminid;
        this.eventName = eventName;
        this.eventDescription = eventDescription;
        this.eventDate = eventDate;
        this.eventTime = eventTime;
        this.eventLocation = eventLocation;
        this.eventFee = eventFee;
        this.tickets = tickets;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getAdminid() { return adminid; }
    public void setAdminid(String adminid) { this.adminid = adminid; }

    public String getEventName() { return eventName; }
    public void setEventName(String eventName) { this.eventName = eventName; }

    public String getEventDescription() { return eventDescription; }
    public void setEventDescription(String eventDescription) { this.eventDescription = eventDescription; }

    public String getEventDate() { return eventDate; }
    public void setEventDate(String eventDate) { this.eventDate = eventDate; }

    public String getEventTime() { return eventTime; }
    public void setEventTime(String eventTime) { this.eventTime = eventTime; }

    public String getEventLocation() { return eventLocation; }
    public void setEventLocation(String eventLocation) { this.eventLocation = eventLocation; }

    public Double getEventFee() { return eventFee; }
    public void setEventFee(Double eventFee) { this.eventFee = eventFee; }

    public Integer getTickets() { return tickets; }
    public void setTickets(Integer tickets) { this.tickets = tickets; }
}
