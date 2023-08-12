using OrderingSystemAFG.Debugging;

namespace OrderingSystemAFG
{
    public class OrderingSystemAFGConsts
    {
        public const string LocalizationSourceName = "OrderingSystemAFG";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "8eb5476a4d6b435298a14adca28f7c1b";
    }
}
