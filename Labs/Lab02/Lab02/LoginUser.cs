using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lab02
{
    internal class LoginUser
    {
        public string username { get; }
        public string password { get; }

        public LoginUser(string _username, string _password)
        {
            this.username = _username;
            this.password = _password;
        }
    }
}
