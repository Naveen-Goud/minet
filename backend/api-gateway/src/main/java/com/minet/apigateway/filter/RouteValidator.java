package com.minet.apigateway.filter;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.Predicate;

@Component
public class RouteValidator {
    public RouteValidator() {
        System.out.println(openApiEndpoints+"Route validator");
    }

    public static final List<String> openApiEndpoints= List.of(
            "/api/users/register",
            "/api/users/login",
            "/api/users/getAll",
            "/api/users/auth0"
    );


    public Predicate<ServerHttpRequest> isSecured =
            request -> openApiEndpoints
                    .stream()
                    .noneMatch(uri -> request.getURI().getPath().contains(uri));
}
