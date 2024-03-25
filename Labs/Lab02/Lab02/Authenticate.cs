using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lab02
{
    internal class Authenticate
    {
        private Dictionary<String, User> storedUsers { get; }
        private Dictionary<String, DateTime> userSession { get; }
        public Authenticate()
        { 
            storedUsers = new Dictionary<String,User>();
            userSession = new Dictionary<String,DateTime>();
        }

        private byte[] getSalt()
        {
            byte[] salt = new byte[16];
            using (var rngCsp = new RNGCryptoServiceProvider())
            {
                // Fill the array with a random value.
                rngCsp.GetBytes(salt);
            }
            return salt;
        }

        private byte[] hashPassword(string password, byte[] salt)
        {

            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 1000, HashAlgorithmName.SHA256);
            byte[] hashWithSalt = pbkdf2.GetBytes(20);

            return hashWithSalt;
        }
        public void registerUser(LoginUser user)
        {
            if (storedUsers.ContainsKey(user.username))
            {
                throw new AuthenticationException(String.Format("User with the username '{0}' already registered", user.username));
            }
            byte[] salt = getSalt();
            byte[] hashedPassword = hashPassword(user.password, salt);

            User newUser = new User(user.username, Convert.ToBase64String(hashedPassword),Convert.ToBase64String(salt));
            Console.WriteLine(String.Format("{0}, {1}, {2}; \n", user.username, Convert.ToBase64String(hashedPassword), Convert.ToBase64String(salt)));
            storedUsers.Add(user.username, newUser);

        }

        

        public bool loginUser(LoginUser user)
        {

            if (!storedUsers.ContainsKey(user.username))
            {
                throw new AuthenticationException(String.Format("User with the username '{0}' not registered yet", user.username));
            }
           
            User storedUser = storedUsers[user.username];
            Console.WriteLine(String.Format("{0}, {1}, {2}; \n", storedUser.username, storedUser.passwordHash, storedUser.salt));

            byte[] salt = Convert.FromBase64String(storedUser.salt);
            byte[] hashedinputPassword = hashPassword(user.password, salt);
            string inputPassword = Convert.ToBase64String(hashedinputPassword);
            Console.WriteLine(inputPassword);

            if (inputPassword == storedUser.passwordHash)
            {
                DateTime sessionEndTime = DateTime.Now; 
                userSession[user.username] = sessionEndTime.AddMinutes(30);
                return true;
            }
            return false;            
        }

        //summary:
        //for checking if the session is expired
        //if not let the user in
        public bool isLoggedIn(String userName)
        {
            if (!userSession.ContainsKey(userName))
            {
                return false;
            }

            DateTime currentTime = DateTime.Now;
            DateTime sessionEndTime = userSession[userName];
            Console.WriteLine(sessionEndTime.ToString());
            return currentTime < sessionEndTime ? true : false;
        }
    }
}
