namespace Lab01
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int sum = 0;
            int n1 = 0;
            int n2 = 1;

            while(n2 < 4000000)
            {
                int temp = n2;
                Console.WriteLine(temp);
                n2 = n1 + n2;
                n1 = temp;

                if(n2 % 2 == 0)
                {
                    sum += n2;
                }
            }

            Console.WriteLine("The sum is: " + sum);
        }
    }
}