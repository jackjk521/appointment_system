@extends('layouts.app')

@section('content')
<div className="container">
    <div className="row justify-content-center">
        <div className="col-md-8">
            <div className="card">
                <div className="card-header">{{ __('Register') }}</div>

                <div className="card-body">
                    <form method="POST" action="{{ route('register') }}">
                        @csrf

                        <div className="row mb-3">
                            <label htmlFor="name" className="col-md-4 col-form-label text-md-end">{{ __('Name') }}</label>

                            <div className="col-md-6">
                                <input id="name" type="text" className="form-control @error('name') is-invalid @enderror" name="name" value="{{ old('name') }}" required autocomplete="name" autofocus>

                                @error('name')
                                    <span className="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label htmlFor="email" className="col-md-4 col-form-label text-md-end">{{ __('Email Address') }}</label>

                            <div className="col-md-6">
                                <input id="email" type="email" className="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email">

                                @error('email')
                                    <span className="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label htmlFor="password" className="col-md-4 col-form-label text-md-end">{{ __('Password') }}</label>

                            <div className="col-md-6">
                                <input id="password" type="password" className="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="new-password">

                                @error('password')
                                    <span className="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label htmlFor="password-confirm" className="col-md-4 col-form-label text-md-end">{{ __('Confirm Password') }}</label>

                            <div className="col-md-6">
                                <input id="password-confirm" type="password" className="form-control" name="password_confirmation" required autocomplete="new-password">
                            </div>
                        </div>

                        <div className="row mb-0">
                            <div className="col-md-6 offset-md-4">
                                <button type="submit" className="btn btn-primary">
                                    {{ __('Register') }}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
