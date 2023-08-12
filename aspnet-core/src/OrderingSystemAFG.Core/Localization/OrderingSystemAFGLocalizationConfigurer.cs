using Abp.Configuration.Startup;
using Abp.Localization.Dictionaries;
using Abp.Localization.Dictionaries.Xml;
using Abp.Reflection.Extensions;

namespace OrderingSystemAFG.Localization
{
    public static class OrderingSystemAFGLocalizationConfigurer
    {
        public static void Configure(ILocalizationConfiguration localizationConfiguration)
        {
            localizationConfiguration.Sources.Add(
                new DictionaryBasedLocalizationSource(OrderingSystemAFGConsts.LocalizationSourceName,
                    new XmlEmbeddedFileLocalizationDictionaryProvider(
                        typeof(OrderingSystemAFGLocalizationConfigurer).GetAssembly(),
                        "OrderingSystemAFG.Localization.SourceFiles"
                    )
                )
            );
        }
    }
}
