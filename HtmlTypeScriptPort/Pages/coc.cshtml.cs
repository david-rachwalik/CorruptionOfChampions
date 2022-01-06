using Microsoft.AspNetCore.Mvc.RazorPages;

namespace HtmlTypeScriptPort.Pages;

public class CocModel : PageModel
{
    private readonly ILogger<CocModel> _logger;

    public CocModel(ILogger<CocModel> logger)
    {
        _logger = logger;
    }

    public void OnGet()
    {
    }
}