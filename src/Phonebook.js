import React, { Component } from 'react';
import './Phonebook.css';

class Phonebook extends Component {

  constructor() {
    super();
    
    this.state = {
      name: '',
      lastName: '',
      phoneNumber: '',
      searchQuery: '',
      contactData: [],
      phoneBook: [],
      emptyPhonebook: true,
      showForm: false,
      formError: false
    } 

    // Hides/Shows the add contact form
    this.toggleAddContact = (e) => {
      this.setState(
        { showForm: !this.state.showForm }
      );
    }

    // Manages the contact fields values and sets states
    this.onInputChange = (e) => {
      this.setState({ 
        [e.target.name]: e.target.value,
        formError: false
      });
    }

    // Creates a new contact using the contact field values
    this.addContact = (e) => {
      
      // Set the contact's name, last name, phone number
      // Include contactSearch as a 'handleized' string to allow searching for any contact data
      const newContact = {
        name: this.state.name,
        lastName: this.state.lastName,
        phoneNumber: this.state.phoneNumber,
        contactSearch: this.state.name.replace(/\s/g, '_').toLowerCase() + '_' + this.state.lastName.replace(/\s/g, '_').toLowerCase() + '_' + this.state.phoneNumber.replace(/\s/g, '_').toLowerCase()
      }
      
      if (newContact.name && newContact.phoneNumber) {
        // Adds new contact data to the contactData array
        // Adds new contact data to the phoneBook array
        this.setState((prevState) => ({
          contactData: prevState.contactData.concat(newContact),
          phoneBook: prevState.contactData.concat(newContact),
          name: '',
          lastName: '',
          phoneNumber: '',
          emptyPhonebook: false,
          showForm: false,
          formError: false
        }));
      } else {
        this.setState(
          { formError: true }
        );
      }

      this.setState(
        { [e.target.name]: e.target.value }
      );
    }

    // Filters the phoneBook array to only pull the search terms,
    this.onSearch = (e) => {
      this.setState(
        {searchQuery: e.target.value}
      );
      
      // We filter the 
      if (e.target.value) {
        const searchQuery = this.state.phoneBook.filter(contact => contact.contactSearch.includes(this.state.searchQuery));
  
        this.setState(
          { phoneBook: searchQuery}
        );
      } else {
        // If the search terms is empty we reset the phoneBook to display all contacts data
        this.setState(
          { phoneBook: this.state.contactData }
        );
      }
    }
  }

  render() {
    let addContactForm = null;

    let contactList = (
      <div className="phonebook-contacts">
        {this.state.emptyPhonebook ? 
          <ul>
            <li className="empty">No contacts, lets add some :)</li>
          </ul>
        : 
          <ul>
            {this.state.phoneBook.map(contact =>
              <li key={contact.name} className="contact">
                <span className="contact__name">{contact.name} {contact.lastName}</span>   
                <span className="contact__number">{contact.phoneNumber}</span>
              </li>  
            )}
          </ul>
        }
      </div> 
    );

    if (this.state.showForm) {
      addContactForm = (
        <div className="phonebook-form">
          <form className="form" id="addContactForm">
            <div className="form-group">
              <input name="name" type="text" className={ this.state.formError ? 'form-control form-control--error' : 'form-control' } placeholder="Name" onChange={this.onInputChange} value={this.state.name}/>
            </div>

            <div className="form-group">
              <input name="lastName" type="text" className="form-control" placeholder="Last Name" onChange={this.onInputChange} value={this.state.lastName}/>
            </div>

            <div className="form-group">
              <input name="phoneNumber" type="text" className={ this.state.formError ? 'form-control form-control--error' : 'form-control' } placeholder="Phone Number" onChange={this.onInputChange} value={this.state.phoneNumber}/>
            </div>

            <div className="form-group form-group--phonebook-footer">
              <button type="button" className="btn btn-primary" onClick={this.addContact}>Add Contact</button>
              <button type="button" className="btn btn-primary" onClick={this.toggleAddContact}>Cancel</button>
            </div>
          </form>

          {this.state.formError ? <p className="phonebook-form__error">Please fill required fields</p> : ''}
        </div>
      );
    }

    return (
      <div className="phonebook">
        <div className="container">
          <div className="row justitfy-center">
            <div className="phonebook-inner-container col-md-6">

              <div className="phonebook-header">
                <h4>Contacts</h4>
                <div className="phonebook-add" onClick={this.toggleAddContact}>+</div>
              </div>

              <div className="phonebook-search">
                <div className="form-group">
                  <input type="search" placeholder="Search" className="form-control" onChange={this.onSearch} value={this.state.searchQuery} />
                </div>
              </div>

              { addContactForm }
              
              { contactList }
            </div>

            <div className="col-md-6">
              <ul>
                <li>Use the "+" cta to add a new contact</li>
                <li>You can search by name, last name & phonenumber</li>
              </ul>
            </div>
          </div>
        </div>
      </div> 
    );
  }
}

export default Phonebook;
