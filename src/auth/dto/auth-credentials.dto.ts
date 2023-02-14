import { IsNotEmpty, IsString, Matches, Max, MaxLength, Min, MinLength } from "class-validator";

export class AuthCredentials {

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(6)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: "password too weak" })
    //https://gist.github.com/arielweinberger/18a29bfa17072444d45adaeeb8e92ddc
    /*
    Passwords will contain at least 1 upper case letter
    Passwords will contain at least 1 lower case letter
    Passwords will contain at least 1 number or special character
    There is no length validation (min, max) in this regex!

    */
    password: string;

}