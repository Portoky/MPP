using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lab02
{
    internal class User
    {
        public string username { get; }
        public string passwordHash { get; }
        public string salt { get; }

        public User(string _username, string _passwordHash, string _salt)
        {
            this.username = _username;
            this.passwordHash = _passwordHash;
            this.salt = _salt;
        }

    }
}
