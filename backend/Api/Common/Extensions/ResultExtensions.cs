namespace Api.Common.Extensions;

using Domain.Common;
using Microsoft.AspNetCore.Mvc;

public static class ResultExtensions
{
    public static IResult ToProblemDetails<T>(this Result<T> result)
    {
        if (result.IsSuccess) throw new InvalidOperationException("Cannot convert success result to ProblemDetails.");
        var error = result.Error!;
        var status = GetStatusCode(error.Code);
        return Results.Problem(title: error.Code, detail: error.Message, statusCode: status);
    }

    private static int GetStatusCode(string errorCode) => errorCode switch
    {
        string code when code.Contains("NotFound", StringComparison.OrdinalIgnoreCase) => 404,
        string code when code.Contains("Validation", StringComparison.OrdinalIgnoreCase) => 400,
        string code when code.Contains("Conflict", StringComparison.OrdinalIgnoreCase) => 409,
        _ => 500
    };
}
