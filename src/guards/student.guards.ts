import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class StudentGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
    private roles = ['admin', 'principal', 'teacher'];
    canActivate(context: ExecutionContext) {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());

        const request = context.switchToHttp().getRequest<Request>();
        const authHeader = request.headers['authorization'];
        if (!authHeader) {
            throw new UnauthorizedException('Missing Authorization header');
        }

        const token = authHeader.split(' ')[1];
        let userRole = '';
        for (const role of this.roles) {
            if (role == token) userRole = token;
        }

        if (!roles.includes(userRole)) {
            throw new ForbiddenException('You do not have access to this resource');
        }

        return true;
    }
}
