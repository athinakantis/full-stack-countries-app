import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../../config/supabase";

export const Login = () => {
  return (
    <div className='login-container flex justify-center'
    >
      <div className='mt-10 w-11/12 max-w-md'>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#1976d2",
                  brandAccent: "#1565c0",
                  inputBackground: 'white',
                  inputBorder: 'oklch(0.704 0.04 256.788)',
                  inputBorderFocus: 'oklch(0.704 0.04 256.788)',
                  anchorTextColor: 'oklch(0.446 0.043 257.281)',
                  defaultButtonBackgroundHover: 'oklch(0.97 0.014 254.604)',
                  defaultButtonBorder: 'oklch(0.704 0.04 256.788)',
                  inputLabelText: 'oklch(0.554 0.046 257.417)',
                },
                fontSizes: {
                  baseButtonSize: '1.1rem',
                },
                fonts: {
                  buttonFontFamily: 'Lato',
                  labelFontFamily: 'Lato',
                  inputFontFamily: 'Lato'
                }
              },
            },
          }}
          providers={["google"]}
          socialLayout="horizontal"
          view="sign_in"
        />
      </div>
    </div>
  );
};