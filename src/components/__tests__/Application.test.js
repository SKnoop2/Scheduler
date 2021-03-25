import React from "react";
import { fireEvent } from "@testing-library/react/dist";
import { 
  render, 
  cleanup, 
  waitForElement, 
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  prettyDOM } from "@testing-library/react";

import axios from "axios";
import Application from "components/Application";

afterEach(cleanup);

describe ("Application", ()=>{
  // function written in a different syntax for learning purposes
   it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday"))
    .then (() => {fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  }); 


  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />); 

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen")); 

    // 3. Click the "Add" button on the first empty appointment.
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    fireEvent.click(getByAltText(appointment, "Add")); 
    
    // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), { 
      target: { value: "Lydia Miller-Jones" }
    });

    // 5. Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer")); 
    
    // 6. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save")); 
    
    // 7. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "SAVING")).toBeInTheDocument(); 
    
    // 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones")); 
    
    // 9. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday")); 
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  })


  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    
    const { container } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(getByAltText(appointment, "Delete"));
    
    expect(getByText(appointment, /are you sure you want to delete/i)).toBeInTheDocument();
    
    fireEvent.click(getByText(appointment, "Confirm"));
    
    expect(getByText(appointment, "DELETING")).toBeInTheDocument(); 
    
    await waitForElement(() => getByAltText(appointment, "Add")); 

    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday")); 
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });


  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Edit"));
    
    await waitForElement(() => getByText(appointment, "Cancel")); 
    
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), { 
      target: { value: "Nancy Drew" }
    });
    
    fireEvent.click(getByAltText(appointment, "Tori Malcolm")); 
    
    fireEvent.click(getByText(appointment, "Save")); 
    
    expect(getByText(appointment, "SAVING")).toBeInTheDocument(); 
    
    await waitForElement(() => queryByText(appointment, "Nancy Drew")); 
    
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday")); 
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
    
  });


  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce()
    const { container } = render(<Application />); 

    await waitForElement(() => getByText(container, "Archie Cohen")); 

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    fireEvent.click(getByAltText(appointment, "Add")); 
    
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), { 
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer")); 

    fireEvent.click(getByText(appointment, "Save")); 

    expect(getByText(appointment, "SAVING")).toBeInTheDocument(); 
    
    await waitForElement(() => getByText(appointment, /could not save your appointment/i)); 
    
    
    fireEvent.click(getByAltText(appointment, "Close")); 
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    
    axios.delete.mockRejectedValueOnce()
    
    const { container, debug } = render(<Application />); 

    await waitForElement(() => getByText(container, "Archie Cohen")); 

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Delete")); 
    
    expect(getByText(appointment, /are you sure you want to delete/i)).toBeInTheDocument();
    
    fireEvent.click(getByText(appointment, "Confirm"));
    
    expect(getByText(appointment, "DELETING")).toBeInTheDocument()
    
    debug(appointment)
    await waitForElement(() => getByText(appointment, /Could not delete your appointment/i)); 
    
    fireEvent.click(getByAltText(appointment, "Close")); 
  })
})