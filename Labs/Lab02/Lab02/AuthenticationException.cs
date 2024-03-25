using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lab02
{
    internal class AuthenticationException : Exception
    {
        public AuthenticationException(string message): base(String.Format("Authentication exception: {0}", message))
        {
        }
    }
}
