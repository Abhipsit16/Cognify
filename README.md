# Cognify

Cognify is a data-sharing platform that serves as a data market and provides data solutions for organizations. The app enables users to:

- **Search for relevant data**
- **Post data** as public or restricted
- **Request data**
- **Collaborate via chatrooms**

---

## How to Use?

### Prerequisites
Before using Cognify, ensure the following steps are completed:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Abhipsit16/Cognify.git
   ```

2. **Install Dependencies**
   Run the following command to install the required Node modules:
   ```bash
   npm install
   ```

3. **Set Up Natural Language Processing (NLP) Based Search**
   - **Create an Account** on [Hugging Face](https://www.huggingface.co).
   - **Generate an Access Token**:
     1. Click on your profile picture icon.
     2. Navigate to **Access Tokens**.
     3. Create a new token and copy it.
   - **Create a `.env.local` File**:
     1. On your local system, create a file named `.env.local`.
     2. Add the following line to the file (replace `<your_token>` with your actual token):
        ```
        API_KEY=<your_token>
        ```
     > **Note:** Do not use quotation marks around the token.

4. **Update Socket Client Configuration**
   - Open the `socketClient.js` file.
   - If needed, replace the IP address with your local system's IP address.

---

## Running the Project

1. Save all changes to the project.
2. Run the following command to start the development server:
   ```bash
   npm run dev
   ```
3. Click on the generated link to access Cognify.
4. **Enjoy the Experience!**

---

### Features

- **Data Search**: Utilize NLP-based search for finding relevant data efficiently.
- **Data Posting**: Post data with options for public or restricted access.
- **Data Requests**: Request data from other users or organizations.
- **Collaboration**: Engage in real-time discussions through chatrooms.
  
---

### Some Images


- **On phone**
  ![Screenshot_2025-01-14_233905 1](https://github.com/user-attachments/assets/b9385a9b-8f8f-49e8-989a-683e073fe8e0)
- **Recieve section**
  ![Screenshot_2025-01-14_233242 1](https://github.com/user-attachments/assets/98e64534-31b8-4c1e-9ed5-2661936c5316)
- **Posting the data**
  ![WhatsApp Image 2025-01-14 at 23 40 06_8d5b5b53](https://github.com/user-attachments/assets/d273ca8f-6503-47b8-81e0-13283e0115be)
- **Semantic NLP based search**
  ![Screenshot_2025-01-14_233106 1](https://github.com/user-attachments/assets/5cfd3ad6-e25f-4355-993d-2f9e62352e2d)
- **Complete post**
  ![Screenshot_2025-01-14_233137 1](https://github.com/user-attachments/assets/1f1fc1e6-f96b-47c6-a0cd-f99742feebf6)
- **Chatting and Collaborating on data**
  ![Screenshot_2025-01-14_233915 1](https://github.com/user-attachments/assets/812ab5ce-504a-43af-96a8-36fbee2655b4)

---

### Future Prospects

- Working against the unauthorized data sharing to third parties via blockchain.
- Integrating AI based data review and analytics.
- Integrating payment system to allow selling of data. 

---

### Contribution
Contributions are welcome! Feel free to fork the repository and submit pull requests.

---

