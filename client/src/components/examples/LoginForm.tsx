import LoginForm from '../LoginForm';
import earthBg from '@assets/generated_images/Earth_from_space_weather_view_6fc954f0.png';

export default function LoginFormExample() {
  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: `url(${earthBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-primary/30" />
      <div className="relative z-10">
        <LoginForm />
      </div>
    </div>
  );
}
