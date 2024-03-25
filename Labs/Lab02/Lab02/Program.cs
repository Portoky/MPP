using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lab02
{
    internal class Program
    {
        static void Main(string[] args)
        {
            LoginUser user = new LoginUser("Lajos", "jelszo");
            Authenticate authenticate = new Authenticate();

            authenticate.registerUser(user);
            Console.WriteLine(authenticate.isLoggedIn(user.username));
            Console.WriteLine(authenticate.loginUser(user));
            Console.WriteLine(authenticate.isLoggedIn(user.username));
        }
    }
}
