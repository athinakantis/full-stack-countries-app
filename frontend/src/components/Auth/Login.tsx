import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../../config/supabase";

export const Login = () => {
  return (
    <div className='login-container'
    >
      <div>
        <h5>
          Welcome
        </h5>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#1976d2",
                  brandAccent: "#1565c0",
                },
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